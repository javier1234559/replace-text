import { useState, useEffect } from 'react';
import TextEditor from './components/TextEditor/TextEditor';
import { replaceText } from './lib/utils';

function App() {
  const [selectedOption, setSelectedOption] = useState('accept1');
  const [embedText, setEmbedText] = useState('');
  const [resultText, setResultText] = useState('');
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    const optionsData = {
      accept1: {
        embedText: `Dear {{name}}, Hiện tại {{name}} có đăng ký điểm thanh toán Momo tại địa chỉ {{address}} Nhờ {{name}} xác nhận tên thương hiệu và địa chỉ của quán là chính xác qua tin nhắn này giúp em để bên {{vocative}} tiến hành hỗ trợ xác minh cho cửa hàng mình ạ, {{vocative}} cảm ơn `,
        inputList: [
          { key: 'vocative', value: 'em' },
          { key: 'name', value: '' },
          { key: 'address', value: '' },
        ],
      },
      accept2: {
        embedText: `Dear {{name}}, Hiện tại {{name}} có đăng ký điểm thanh toán Momo MID: {{MID}}; Tên CH: {{shop_name}}; Nhờ {{name}} xác nhận qua tin nhắn này giúp {{vocative}} hiện tại địa chỉ cửa hàng mình đang hoạt động 2 loại hình khác nhau là {{types}} muốn tách biệt doanh thu để thuận tiện cho việc quản lý nguồn tiền khách thanh toán. Bên {{name}} xác nhận lại thông tin để {{vocative}} tiến hành hỗ trợ cho mình ạ ,{{vocative}} cảm ơn ạ`,
        inputList: [
          { key: 'vocative', value: 'em' },
          { key: 'name', value: '' },
          { key: 'MID', value: '' },
          { key: 'shop_name', value: '' },
          { key: 'address', value: '' },
          { key: 'types', value: '' },
        ],
      },
    };

    // Update embedText and inputList state based on selectedOption
    setEmbedText(optionsData[selectedOption]?.embedText || '');
    setInputList(optionsData[selectedOption]?.inputList || []);
  }, [selectedOption]);

  const handleInputChange = (index, key, value) => {
    const newList = [...inputList];
    newList[index] = { ...newList[index], [key]: value };
    console.log(newList);
    setInputList(newList);
  };

  const handleAddField = () => {
    setInputList([...inputList, { key: '', value: '' }]);
  };

  const handleSubmit = () => {
    //build Object
    const variables = inputList.reduce((acc, variable) => {
      return { ...acc, [variable.key]: variable.value };
    }, {});
    console.log(variables);

    //replace text
    const newText = replaceText(embedText, variables);
    console.log(newText);
    console.log(inputList);

    //set value to second editor
    setResultText(newText);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="form-title">Text Replace app</h1>
        <div className="form-dynamic-input">
          <div className="form-row">
            <h2>Variable</h2>
            <h2>Value</h2>
          </div>
          {inputList.map((input, index) => (
            <div className="form-row" key={index}>
              <input type="text" placeholder={`Enter variable ${index}`} value={input.key} onChange={(e) => handleInputChange(index, 'key', e.target.value)} />
              <input type="text" placeholder={`Enter value ${index}`} value={input.value} onChange={(e) => handleInputChange(index, 'value', e.target.value)} />
            </div>
          ))}
        </div>
        <div className="btn-group">
          <button onClick={handleAddField}>Add Variable</button>
          <button onClick={handleSubmit}>Replace</button>
          <select className="select" value={selectedOption} onChange={handleSelectChange}>
            <option value="accept1">Xác nhận địa chỉ</option>
            <option value="accept2">Xác nhận 2 mặt hàng</option>
          </select>
        </div>
        <TextEditor text={embedText} />
        <TextEditor text={resultText} />
      </div>
    </div>
  );
}

export default App;
