import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';



jest.mock('./helper/studentService', () => ({
  getStudents: () => Promise.resolve(['Orion', 'Shaggy']),
  getStudentMeeting: () => Promise.resolve([{
    id: 1,
    period: 0,
    days_of_week: [
      'regular_day',
      'short_day'
    ],
    duration: 30,
    name: "Arrival",
    tags: []
  }]),
  getTimeSpentInMeetings: () => {
    return 10;
  }
}))
describe('Test in App component', ()=>{

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should render the App component', async() => {
    render(<App />);
    await waitFor(()=> {
      expect(screen.getByText('Please input a student name:')).toBeInTheDocument();
    });
    expect(screen.getByRole('combobox', {name: /please input a student name:/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument();
  });

  test('Should display span with the percentage of spent time in instructional meeting when the student is selected and submit button is clicked', async() => {
    render(<App />);
    await waitFor(()=> {
      expect(screen.getByText('Please input a student name:')).toBeInTheDocument();
    });
    const dropdown = screen.getByTestId('selector') ;
    expect(dropdown.value).toEqual('default');
    fireEvent.change(dropdown, { target: { value: 'Orion' } });
    expect(dropdown.value).toEqual('Orion');
    userEvent.click(screen.getByText('Submit'))
    await waitFor(()=>{
      expect(screen.getByText('Snickerdoodle spends 10% of their time in instructional meetings')).toBeInTheDocument()
    })
  });
})

