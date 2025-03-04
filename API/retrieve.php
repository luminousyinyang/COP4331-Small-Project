<?php
    // Gets necessary data from JS file
    $inData = getRequestInfo();
        
    $searchResults = "";
    
    $conn = new mysqli("localhost", "Alex", "password", "contact_manager");

    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        if (strpos($inData["search"], " ") !== false) {
			$fullSearch = "%" . $inData["search"] . "%";

            $split = explode(" ", $inData["search"], 2);
            $firstName = $split[0];
            $lastName = "%" . $split[1] . "%";
            
            $stmt = $conn->prepare("SELECT FirstName, LastName, Phone, Email FROM Contacts WHERE UserID=? AND ((FirstName=? AND LastName LIKE ?) OR FirstName LIKE ?) ORDER BY LastName, FirstName");
            $stmt->bind_param("isss", $inData["UserId"], $firstName, $lastName, $fullSearch);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    if (!empty($searchResults)) {
                        $searchResults .= ",";
                    }
					$searchCount++;
                    $searchResults .= '{"FirstName":"' . $row["FirstName"] . '", "LastName":"' . $row["LastName"] . '", "Phone":"' . $row["Phone"] . '", "Email":"' . $row["Email"] . '"}';
                }
            } else {
                $stmt->close();

                $fullSearch = "%" . $inData["search"] . "%";
                $stmt = $conn->prepare("SELECT FirstName, LastName, Phone, Email FROM Contacts WHERE UserID=? AND FirstName LIKE ? ORDER BY LastName, FirstName");
                $stmt->bind_param("is", $inData["UserId"], $fullSearch);
                $stmt->execute();

                $result = $stmt->get_result();
                while ($row = $result->fetch_assoc()) {
                    if (!empty($searchResults)) {
                        $searchResults .= ",";
                    }
					$searchCount++;
                    $searchResults .= '{"FirstName":"' . $row["FirstName"] . '", "LastName":"' . $row["LastName"] . '", "Phone":"' . $row["Phone"] . '", "Email":"' . $row["Email"] . '"}';
                }
            }
        } else {
            $fullSearch = "%" . $inData["search"] . "%";
            $stmt = $conn->prepare("SELECT FirstName, LastName, Phone, Email FROM Contacts WHERE UserID=? AND FirstName LIKE ? ORDER BY LastName, FirstName");
            $stmt->bind_param("is", $inData["UserId"], $fullSearch);
            $stmt->execute();

            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
                if (!empty($searchResults)) {
                    $searchResults .= ",";
                }
				$searchCount++;
                $searchResults .= '{"FirstName":"' . $row["FirstName"] . '", "LastName":"' . $row["LastName"] . '", "Phone":"' . $row["Phone"] . '", "Email":"' . $row["Email"] . '"}';
            }
        }
		
		if ( $searchCount == 0 ) 
		{
			returnWithError( "No Records Found" );
		} else {
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>