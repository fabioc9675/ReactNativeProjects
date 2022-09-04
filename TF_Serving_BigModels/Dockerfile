FROM tensorflow/serving
EXPOSE 8601
RUN tensorflow_model_server --rest_api_port=8601 --allow_version_labels_for_unavailable_models --model_config_file=/models.config.conf