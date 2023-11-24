// File: Create.test.js
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import Create from '../src/components/task/Create';

jest.mock('axios');

describe('Create Component', () => {
  test('renders with form fields', () => {
    render(<Create isOpen={true} onClose={() => {}} onSubmit={() => {}} />);
    
    // Ensure that form fields are present
    expect(screen.getByLabelText(/Task/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nama/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Alamat/)).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
    expect(screen.getByText(/Close/)).toBeInTheDocument();
  });

  test('form submission', async () => {
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();
    
    axios.post.mockResolvedValueOnce({ status: 201 });
    
    render(<Create isOpen={true} onClose={onCloseMock} onSubmit={onSubmitMock} />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Task/), { target: { value: 'Sample Task' } });
    fireEvent.change(screen.getByLabelText(/Nama/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Alamat/), { target: { value: 'Sample Address' } });
    
    // Use act to wait for the asynchronous code to complete
    await act(async () => {
      // Submit the form
      fireEvent.click(screen.getByText(/Submit/));
      
      // Wait for the asynchronous code to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Ensure that the form was submitted successfully
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/task'), {
      task: 'Sample Task',
      name: 'John Doe',
      address: 'Sample Address',
    });
    
    // Ensure that onClose and onSubmit were called
    expect(onCloseMock).toHaveBeenCalled();
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
