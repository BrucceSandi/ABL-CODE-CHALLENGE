import {getStudentMeeting, getStudents, getTimeSpentInMeetings} from './studentService';

describe('Tests in studentService', () => {
    afterEach(() => {
        jest.clearAllMocks()
    });
    test('Should return an student array when getStudents is called', async () => {
        const students = await getStudents();
        expect(students.length).toBeGreaterThan(0);
        expect(students[0]).toEqual(expect.any(String));
    });
    test('Should return studentMeeting data when getStudentMeeting is called', async () => {
        const mockStudentName = 'Hendrix';
        const studentMeetingData = await getStudentMeeting(mockStudentName);
        expect(studentMeetingData.length).toBeGreaterThan(0);
        expect(studentMeetingData[0]).toEqual(expect.any(Object));
    });

    test('Should return the total of time spent in meetings when getTimeSpentInMeetings is called', async () => {
        const mockStudentName = "Hendrix";
        const mockType = "instructional";
        const timeSpentInMeetings = await getTimeSpentInMeetings(mockType, mockStudentName);
        expect(timeSpentInMeetings).toBeGreaterThan(0);
    });

});