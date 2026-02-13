"use client";


import {motion} from "framer-motion";
import {Box, Typography} from "@mui/material";
import {useState} from "react";


export default function Jigglypuff() {
    const [mood, setMood] = useState < "neutral" | "angry" | "sad" > ("neutral");


    const nextMood = () => {
        if (mood === "neutral") 
            setMood("angry");
         else if (mood === "angry") 
            setMood("sad");
         else 
            setMood("neutral");
        
    };

    return (<motion.div drag
        animate={
            {
                y: [0, -6, 0]
            }
        }
        transition={
            {
                repeat: Infinity,
                duration: 1.5
            }
    }>
        <Box sx={
                {
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    textAlign: "center",
                    cursor: "pointer",
                    filter: "drop-shadow(0 0 8px #ff4fd8)"
                }
            }
            onClick={nextMood}>
            <Typography fontSize={38}> {
                mood === "neutral" && "🎤🎀"
            }
                {
                mood === "angry" && "😤🎤"
            }
                {
                mood === "sad" && "🥺🎶"
            } </Typography>


            <Typography fontSize={8}
                sx={
                    {
                        opacity: 0.7
                    }
            }> {
                mood === "neutral" && "Watching..."
            }
                {
                mood === "angry" && "Try harder!"
            }
                {
                mood === "sad" && "Don’t fail me…"
            } </Typography>
        </Box>
    </motion.div>);
}
