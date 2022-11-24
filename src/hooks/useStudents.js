import {useEffect, useState} from "react";
import {getStudents} from "../helper/studentService";


const useFetchStudents = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getStudentList = async () => {
        const studentsList = await getStudents();
        setStudents(studentsList);
        setIsLoading(false);
    };
    useEffect(() => {
        getStudentList().catch(console.error);
    }, []);
    return {
        students,
        isLoading
    };
};

export default useFetchStudents;