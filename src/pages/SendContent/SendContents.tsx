import { useState } from 'react';
import { sendContent } from '../../api/sendContentApi';

function SendContents() {
  const [content, setContent] = useState<string>('');
  const [icon, setIcon] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [userId, setUserId] = useState<number>(1);

  const handleIconClick = (selectedIcon: string) => {
    setIcon(selectedIcon);
    setSelectedIcon(selectedIcon);
  };

  const handleSubmit = async () => {
    try {
      const contentData = { content, icon, userId };
      const response = await sendContent(contentData);
      console.log(response);
      setContent('');
      setIcon('');
      setSelectedIcon('');
      setUserId(1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <div>
        <button
          style={{
            border: selectedIcon === 'A' ? '2px solid blue' : 'none',
          }}
          onClick={() => handleIconClick('A')}
        >
          A
        </button>
        <button
          style={{
            border: selectedIcon === 'B' ? '2px solid blue' : 'none',
          }}
          onClick={() => handleIconClick('B')}
        >
          B
        </button>
        <button
          style={{
            border: selectedIcon === 'C' ? '2px solid blue' : 'none',
          }}
          onClick={() => handleIconClick('C')}
        >
          C
        </button>
      </div>
      <button onClick={handleSubmit}>Send Content</button>
    </div>
  );
}

export default SendContents;
