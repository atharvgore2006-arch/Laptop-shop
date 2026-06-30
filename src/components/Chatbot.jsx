import { useState } from "react";
import "./chatbot.css";
import bot from "../assets/bot.jpg";
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I am your assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    let botReply = "Sorry, I didn't understand that 🤔";

    if (input.toLowerCase().includes("hello")) {
      botReply = "Hello! Welcome to our laptop store 😊";
    } else if (input.toLowerCase().includes("price")) {
      botReply = "Our laptops start from ₹40,000 💻";
    } else if (input.toLowerCase().includes("delivery")) {
      botReply = "We deliver within 3-5 days 🚚";
    } else if (input.toLowerCase().includes("help")) {
      botReply = "Sure! Ask me about products, price, or delivery.";
    } else if (input.toLowerCase().includes("thanks")) {
      botReply = "You're welcome😃";
    } else if (input.toLowerCase().includes("who is owner of the shop")) {
      botReply = "Mr Atharv Gore is owner of the shop😊.";
    }
    else if (input.includes('Where is shop located')){
        botReply='shop is in 123,tech complex,Ahilyanagar'
    }
    else if (input.includes('do you keep refurbished laptops')){
        botReply='yes we also have refurbished laptops in resanable rates'
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    }, 500);

    setInput("");
  };

  return (
    <>
      <div className="chat-button" onClick={() => setOpen(!open)}>
        <img src={bot} height='50px' />
      </div>

      {open && (
        <div className="chat-box">
          <div className="chat-header">Laptop Store Bot</div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === "user" ? "msg user" : "msg bot"}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
