<?php
    # Gets necessary data from JS file
    $inData = getRequestInfo();

    $UserID = $inData["UserID"];
    $NewFirstName = $inData["NewFirstName"];
    $NewLastName = $inData["NewLastName"];
    $NewPhone = $inData["NewPhone"];
    $NewEmail = $inData["NewEmail"];

    $OldFirstName = $inData["OldFirstName"];
    $OldLastName = $inData["OldLastName"];
    $OldPhone = $inData["OldPhone"];
    $OldEmail = $inData["OldEmail"];


    $conn = new mysqli("localhost", "Alex", "password", "contact_manager");

    # Connect to database
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE UserID=? AND FirstName=? AND LastName=? AND Phone=? AND Email=?");
        $stmt->bind_param("ssssissss", $NewFirstName, $NewLastName, $NewPhone, $NewEmail, $UserID, $OldFirstName, $OldLastName, $OldPhone, $OldEmail);

        if ($stmt->execute()) 
        {
            returnWithInfo("Contact updated");
        } 
        else 
        {
            returnWithError("Contact not found");
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($message)
    {
        $retValue = '{"message":"' . $message . '", "error":""}';
        sendResultInfoAsJson($retValue);
    }
?>