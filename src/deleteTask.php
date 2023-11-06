<?php
include('db.php');

header("Access-Control-Allow-Origin: *");
// Allow the following HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow the following headers
header("Access-Control-Allow-Headers: Content-Type");
// Set the response content type to JSON
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $stmt = $conn->prepare("DELETE FROM tasks WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => true]);
}
?>
