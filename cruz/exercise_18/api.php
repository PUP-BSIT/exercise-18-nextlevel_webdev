<?php
header("Content-Type: application/json");

// Database connection details
$servername = '127.0.0.1:3306';
$db_username = 'u754510873_user_exercise';
$db_password = 'zK9]bR|Sgx/U';
$db_name = 'u754510873_db_exercise18';

$conn = mysqli_connect($servername, $db_username, $db_password, $db_name);

if (!$conn) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error"));
    exit();
}

// CRUD operations
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create operation
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate input data
    if (!isset($data['name'], $data['location'], $data['rating'], 
        $data['capacity'], $data['open_hours'])) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid data"));
        exit();
    }

    $name = $data['name'];
    $location = $data['location'];
    $rating = $data['rating'];
    $capacity = $data['capacity'];
    $openHours = $data['open_hours'];

    $query = "INSERT INTO cafe (name, location, rating, capacity, open_hours) 
        VALUES ('$name', '$location', $rating, $capacity, '$openHours')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        http_response_code(201);
        echo json_encode(array("message" => "Cafe created successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error creating Cafe"));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Read operation
    $query = "SELECT * FROM cafe";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $cafes = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($cafes);
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error fetching Cafes"));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    // Update operation
    parse_str(file_get_contents('php://input'), $_PATCH);

    $id = $_PATCH["id"] ?? "";
    $name = $_PATCH["name"] ?? "";
    $location = $_PATCH["location"] ?? "";
    $rating = $_PATCH["rating"] ?? "";
    $capacity = $_PATCH["capacity"] ?? "";
    $openHours = $_PATCH["open_hours"] ?? "";

    $query = "UPDATE cafe SET name='$name', location='$location', 
        rating=$rating, capacity=$capacity, open_hours='$openHours' 
            WHERE id=$id";
    $result = mysqli_query($conn, $query);

    if ($result) {
        echo json_encode(array("message" => "Cafe updated successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error updating Cafe"));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Delete operation
    parse_str(file_get_contents('php://input'), $_DELETE);
    $id = $_DELETE["id"] ?? "";

    $query = "DELETE FROM cafe WHERE id=$id";
    $result = mysqli_query($conn, $query);

    if ($result) {
        echo json_encode(array("message" => "Cafe deleted successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error deleting Cafe"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
}

mysqli_close($conn);
?>
