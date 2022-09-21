import numpy as np
from collections import Counter


def euclidean_distance(x1, x2):
    return np.sqrt(np.sum((x1-x2)**2))


class knn:

    def __init__(self, k=3):
        self.k = k

    def fit(self, X, y):  # X: samples, y: labels
        self.X_train = X
        self.y_train = y

    def predict(self, X):
        predited_labels = [self._predict(x) for x in X]
        return np.array(predited_labels)

    def _predict(self, x):
        # compute distances
        distances = [euclidean_distance(x, x_train)
                     for x_train in self.X_train]  # Calculate the distances between data
        print(distances)
        # get k nearest samples, labels
        # search the k nearest neighbors
        k_indices = np.argsort(distances)[:self.k]
        print(k_indices)
        # found the most common label in the neighbors
        k_nearest_labels = [self.y_train[i] for i in k_indices]
        print(k_nearest_labels)
        # majority vote, most common class label
        most_common = Counter(k_nearest_labels).most_common(
            1)  # print the most common label
        print(most_common)
        return most_common[0][0]
