<?php
include('./db.php');
// Allow requests from any origin (replace '*' with your specific origin)
header("Access-Control-Allow-Origin: *");
// Allow the following HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow the following headers
header("Access-Control-Allow-Headers: Content-Type");
// Set the response content type to JSON
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $message = $_POST['message'];

    $stmt = $conn->prepare("INSERT INTO tasks (title, message) VALUES (?, ?)");
    $stmt->bind_param("ss", $title, $message);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => true]);
}
?>
