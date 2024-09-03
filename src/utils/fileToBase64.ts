export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve((reader.result as string).split(',')[1]);
        } else {
          reject(new Error('Error reading file'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
};