import {renderHook, waitFor} from '@testing-library/react';
import useFetchStudents from './useStudents';

jest.mock('../helper/studentService', () => ({
    getStudents: () => Promise.resolve(['Orion', 'Shaggy']),
}))
describe('Test in useFetchStudents', ()=>{
    afterEach(() => {
        jest.clearAllMocks()
    });
    test('Should return initial state', () => {
        const { result } = renderHook(() => useFetchStudents());
        const { students} = result.current;
        expect(students.length).toBe(0);
    });
    test('Should return an students array', async () => {
        const { result } = renderHook(() => useFetchStudents());
        await waitFor(() => {
            expect(result.current.students.length).toEqual(2);
        });
    });
})