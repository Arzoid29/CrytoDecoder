import * as matrixUtils from "@/matrixUtils/MatrixUtils";
import * as math from 'mathjs';
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

const MatrixEncoder = () => {
    const messageRef = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState<string>();
    const [key, setKey] = useState<string>();
    const [encodedMessage, setEncodedMessage] = useState<string>();

    const encodeMessage = () => {
        const message = messageRef.current?.value.trim();

        if (message === "") return console.log("Message can't be null");

        const messageArray = matrixUtils.convertMessageToAscii(
            message as string
        );

        const requiredMatrixSize = matrixUtils.calculateMatrixSize(
            messageArray.length
        );

        const messageMtx = matrixUtils.createMatrix(requiredMatrixSize);
        matrixUtils.insertArrayIntoMatrix(messageMtx, messageArray);
        setMessage(matrixUtils.getReadableMatrix(messageMtx));

        const keyMatrix = matrixUtils.createKeyMatrix(requiredMatrixSize, 100);
        setKey(matrixUtils.getReadableMatrix(keyMatrix));

        const encodedMatrix = math.multiply(
          math.matrix(messageMtx), 
          math.matrix(keyMatrix)
          );

        setEncodedMessage(matrixUtils.getReadableMatrix(encodedMatrix.toArray()));
    };

    return (
        <>
            <Typography sx={{ pb: 3, fontWeight: 500 }}>
                Message Encoder
            </Typography>
            <Paper sx={{ p: 3 }} elevation={3}>
                <Typography sx={{ fontWeight: 500, pb: 1 }}>
                    Message:{" "}
                </Typography>
                <TextField
                    inputRef={messageRef}
                    multiline
                    minRows={7}
                    maxRows={7}
                    sx={{ mb: 3, width: "100%" }}
                />
                <Button
                    onClick={encodeMessage}
                    color="success"
                    sx={{ width: "100%", mb: 5 }}
                    variant="contained"
                >
                    Encode
                </Button>

                {message && key && encodedMessage && (
                    <div>
                        <Typography sx={{ fontWeight: 500, pb: 1 }}>
                            Message Matrix:{" "}
                        </Typography>

                        <TextField
                            value={message}
                            multiline
                            minRows={8}
                            maxRows={8}
                            sx={{ mb: 3, width: "100%" }}
                        />
                        <Typography sx={{ fontWeight: 500, pb: 1 }}>
                            Key Matrix:{" "}
                        </Typography>
                        <TextField
                            value={key}
                            multiline
                            minRows={8}
                            maxRows={8}
                            sx={{ mb: 3, width: "100%" }}
                        />
                        <Typography sx={{ fontWeight: 500, pb: 1 }}>
                            Encoded Message Matrix:{" "}
                        </Typography>
                        <TextField
                            value={encodedMessage}
                            multiline
                            minRows={4}
                            maxRows={4}
                            sx={{ mb: 3, width: "100%" }}
                        />
                    </div>
                )}
            </Paper>
        </>
    );
};

export default MatrixEncoder;
