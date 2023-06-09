import { useState, useEffect, useCallback } from "react";

export const useGameStatus = (rowscleared) => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        if (rowscleared > 0) {
            setScore(prev => prev + linePoints[rowscleared - 1] * (level + 1));
            setRows(prev => prev + rowscleared);
        }
    }, [level, linePoints, rowscleared])

    useEffect(() => {
        calcScore();
    }, [calcScore, rowscleared, score])

    return [score, setScore, rows, setRows, level, setLevel];
}
