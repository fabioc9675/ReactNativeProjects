/* Copyright 2019 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

#include <TensorFlowLite_ESP32.h>
#include "tensorflow/lite/experimental/micro/kernels/all_ops_resolver.h"
#include "tensorflow/lite/experimental/micro/micro_error_reporter.h"
#include "tensorflow/lite/experimental/micro/micro_interpreter.h"
#include "tensorflow/lite/schema/schema_generated.h"
#include "tensorflow/lite/version.h"

// Globals, used for compatibility with Arduino-style sketches.
namespace
{
    tflite::ErrorReporter *error_reporter = nullptr;
    const tflite::Model *model = nullptr;
    tflite::MicroInterpreter *interpreter = nullptr;
    TfLiteTensor *input = nullptr;
    TfLiteTensor *output = nullptr;
    int inference_count = 0;

    // Create an area of memory to use for input, output, and intermediate arrays.
    // Finding the minimum value for your model may require some trial and error.
    constexpr int kTensorArenaSize = 2 * 1024;
    uint8_t tensor_arena[kTensorArenaSize];
} // namespace

// The name of this function is important for Arduino compatibility.
void setup()
{
    Serial.begin(115200);

    static tflite::MicroErrorReporter micro_error_reporter;
    error_reporter = &micro_error_reporter;

    model = tflite::GetModel(fahrenheit);

    static tflite::ops::micro::AllOpsResolver resolver;

    // Cree un intérprete para ejecutar el modelo.
    static tflite::MicroInterpreter static_interpreter(model,
                                                       resolver,
                                                       tensor_arena,
                                                       kTensorArenaSize,
                                                       error_reporter);
    interpreter = &static_interpreter;

    // Asignar memoria  para los tensores del modelo.
    TfLiteStatus allocate_status = interpreter->AllocateTensors();

    // Obtenga punteros a los tensores de entrada y salida del modelo.
    input = interpreter->input(0);
    output = interpreter->output(0);

    Serial.println("|-----------------------TensorFlowLite-ESP32-----------------------|");
    Serial.println("|---------------------------IRIS DATA SET--------------------------|");
    Serial.println("|-----------Prediction-ESP32----------|---------Real label---------|");

    // Calcule un valor x para alimentar el modelo.
    int samples = 30;
    // int features = 4;
    for (int i = 0; i < samples; i++)
    {
        // for (int u = 0; u < features; u++) {
        // Coloque el valor calculado en el tensor de entrada del modelo
        // input->data.f[u] = test[i][u];
        // }

        input->data.f[0] = i;

        // Ejecute el modelo en esta entrada y verifique que tenga éxito
        TfLiteStatus invoke_status = interpreter->Invoke();

        // Obtenga el valor de salida del tensor

        float out_1 = output->data.f[0];

        Serial.print(float(i), 1);
        Serial.print("|   ");
        Serial.print(out_1, 2);
        Serial.print("   |    ");
        Serial.print(float(i * 1.8 + 32), 2);

        Serial.print("    |\n");
    }

    Serial.println("|-------------------------------------|----------------------------|");
}

void loop()
{
}