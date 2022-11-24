import {useState} from 'react';
import useFetchStudents from './hooks/useStudents';
import { getTimeSpentInMeetings} from './helper/studentService';
import './App.css';

const App = () => {
    const {students, isLoading} = useFetchStudents();
    const [timeInInstructionalMeetings, setTimeInInstructionalMeetings] = useState();
    const onSubmit = async(event) =>{
        event.preventDefault();
        const studentName = event.target.students?.value;
        setTimeInInstructionalMeetings(await getTimeSpentInMeetings('instructional', studentName));
    };
  return (
      <>
          {!isLoading && (
              <form onSubmit={onSubmit}>
              <div className='container'>
                  <label htmlFor='students'>Please input a student name:</label>
                  <select
                      className='form-select'
                      name='students'
                      id='students'
                      defaultValue='default'
                      data-testid='selector'
                  >
                      <option value='default'>Select a student</option>
                      {students.map((student) => (<option key={student} value={student}>{student}</option>))}
                  </select>
                  <button type='button' className='btn btn-primary' type='submit'> Submit</button>
                  {timeInInstructionalMeetings >= 0 ? <span>Snickerdoodle spends {timeInInstructionalMeetings}% of their time in instructional meetings</span> : null}
              </div>

            </form>)}
      </>

  );
}

export default App;
