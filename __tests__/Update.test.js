// File: Update.test.js
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import Update from '../src/components/task/Update';

jest.mock('axios');

describe('Update Component', () => {
  test('renders with form fields and initial data', () => {
    const initialData = {
      id: 1,
      task: 'Sample Task',
      name: 'John Doe',
      address: 'Sample Address',
      status: 1,
    };

    render(<Update isOpen={true} onClose={() => {}} onSubmit={() => {}} initialData={initialData} />);

    // Ensure that form fields are present and populated with initial data
    expect(screen.getByLabelText(/Task/).value).toBe('Sample Task');
    expect(screen.getByLabelText(/Nama/).value).toBe('John Doe');
    expect(screen.getByLabelText(/Alamat/).value).toBe('Sample Address');
  });

  test('form submission', async () => {
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();
    const initialData = {
      id: 1,
      task: 'Sample Task',
      name: 'John Doe',
      address: 'Sample Address',
      status: 1,
    };

    axios.put.mockResolvedValueOnce({ status: 200 });

    render(<Update isOpen={true} onClose={onCloseMock} onSubmit={onSubmitMock} initialData={initialData} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Task/), { target: { value: 'Updated Task' } });
    fireEvent.change(screen.getByLabelText(/Nama/), { target: { value: 'Updated John Doe' } });
    fireEvent.change(screen.getByLabelText(/Alamat/), { target: { value: 'Updated Address' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Update/));

    // Wait for the asynchronous code to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Ensure that the form was submitted successfully
    expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(`/task/${initialData.id}`), {
      task: 'Updated Task',
      name: 'Updated John Doe',
      address: 'Updated Address',
      status: 0, // Assuming status is not changed in the form
    });

    // Ensure that onClose and onSubmit were called
    expect(onCloseMock).toHaveBeenCalled();
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
