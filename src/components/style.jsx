import { styled } from '@mui/system';

export const StyledHeading = styled('h1')(
    ({ theme }) => `
    text-align: center; // Center the text
    font-family: 'IBM Plex Sans', sans-serif; // Set your custom font
    color: #318CE7; // Set the text color to blue
    `
  );

export  const CenteredContainer = styled('div')(
    ({ theme }) => `
    display: flex; // Use flex to center the content
    justify-content: center; // Center horizontally
    align-items: center; // Center vertically (optional)
    margin-top: 20px; // Add space between heading and BarChart
    `
  );