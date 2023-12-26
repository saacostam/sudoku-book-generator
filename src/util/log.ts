export const logProgress = (ratioCompleted: number) => {
    const loadbarTotalChars = 10;
    const loadbarCompletedSectionChars = Math.floor(ratioCompleted * loadbarTotalChars);
    const laodbarPendingSectionChars = loadbarTotalChars - loadbarCompletedSectionChars;
  
    console.log(`${
      '🔴'.repeat(loadbarCompletedSectionChars)
    }${
      '⭕️'.repeat(laodbarPendingSectionChars)
    }`);
  };