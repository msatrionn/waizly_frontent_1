// File: Delete.test.js
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import Delete from '../src/components/task/Delete';

jest.mock('axios');

describe('Delete Component', () => {
  test('renders confirmation message', () => {
    render(<Delete isOpen={true} onClose={() => {}} onDelete={() => {}} taskId={1} />);

    // Ensure that the confirmation message is present
    expect(screen.getByText(/Anda yakin ingin menghapus?/)).toBeInTheDocument();
  });

  test('delete button click', async () => {
    const onCloseMock = jest.fn();
    const onDeleteMock = jest.fn();
    const taskId = 1;

    axios.delete.mockResolvedValueOnce({ status: 200 });

    render(<Delete isOpen={true} onClose={onCloseMock} onDelete={onDeleteMock} taskId={taskId} />);

    // Click the delete button
    fireEvent.click(screen.getByText(/Delete/));

    // Wait for the asynchronous code to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Ensure that the delete request was sent
    expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining(`/task/${taskId}`));

    // Ensure that onDelete and onClose were called
    expect(onDeleteMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('cancel button click', () => {
    const onCloseMock = jest.fn();
    const onDeleteMock = jest.fn();
    const taskId = 1;

    render(<Delete isOpen={true} onClose={onCloseMock} onDelete={onDeleteMock} taskId={taskId} />);

    // Click the cancel button
    fireEvent.click(screen.getByText(/Cancel/));

    // Ensure that onDelete and onClose were not called
    expect(onDeleteMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
