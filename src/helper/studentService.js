const baseUrl = 'https://crystal-pepsi.herokuapp.com/students';
const token = '2444011b-7b70-4608-aa17-bdfb67359553';

const headers = {
    headers: new Headers({
        'Authorization': token,
    })
};
export const getStudents = async () => {
    const resp = await fetch(baseUrl, headers);
    const  data  = await resp.json();
    return data;
};

export const getStudentMeeting = async (studentName) => {
    const url = `${baseUrl}/${studentName}/meetings`;
    const resp = await fetch(url, headers);
    const data  = await resp.json();
    return data;
};

export const getTimeSpentInMeetings = async (type, studentName) => {
    const meetings = await getStudentMeeting(studentName).catch(console.error);
    let totalMeetingsDuration = 0;
    let meetingTypeDuration = 0;
    for (let i = 0; i < meetings.length ; i++){
        totalMeetingsDuration += meetings[i].duration;
        if (meetings[i].tags.includes(type)){
            meetingTypeDuration += 1;
        }
    }
    const timeSpentInMeetings = meetingTypeDuration > 0 ? (totalMeetingsDuration / meetingTypeDuration) : 0;

    return Math.round(timeSpentInMeetings);

}

