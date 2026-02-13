"use client";


import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {useParams, useRouter} from "next/navigation";
import Jigglypuff from "@/components/Jigglypuff";


export default function Question() {
    const {id} = useParams();
    const router = useRouter();


    const [q, setQ] = useState < any > (null);
    const [answer, setAnswer] = useState("");
    const [hearts, setHearts] = useState(3);
    const [hint, setHint] = useState(false);


    useEffect(() => {
        fetch(`/api/question/${id}`).then((r) => r.json()).then(setQ);
    }, [id]);


    if (!q) 
        return null;
    

    const submit = async () => {
        const res = await fetch("/api/answer", {
            method: "POST",
            body: JSON.stringify(
                {level: id, answer}
            )
        });


        const data = await res.json();


        if (data.correct) 
            router.push(`/question/${
                Number(id) + 1
            }`);
         else {
            setHearts(data.hearts);
            if (data.locked) 
                router.push("/locked");
            
        }
    };

    return (<Box p={3}
        maxWidth={700}
        mx="auto">
        <Paper sx={
            {
                p: 4
            }
        }>
            <Typography>LEVEL {id}</Typography>


            <Typography mt={2}> {
                q.question
            }</Typography>


            <TextField fullWidth
                sx={
                    {
                        mt: 3
                    }
                }
                value={answer}
                onChange={
                    (e) => setAnswer(e.target.value)
                }/>


            <Button sx={
                    {
                        mt: 2
                    }
                }
                variant="contained"
                onClick={submit}>
                Lock
            </Button>


            <Button sx={
                    {
                        mt: 2,
                        ml: 2
                    }
                }
                onClick={
                    () => setHint(true)
            }>
                Hint
            </Button>


            {
            hint && <Typography mt={2}>💭 {
                q.hint
            }</Typography>
        }


            <Typography mt={3}>❤️ x {hearts}</Typography>
        </Paper>


        <Jigglypuff/>
    </Box>);
}
