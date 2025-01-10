const ContactList = ({ contacts, onSelectChat }) => {
  return (
    <ul className="contacts">
      {contacts.map((chat) => {
        // Get the latest message
        const latestMessage = chat.messages?.[chat.messages.length - 1];
        const senderName = latestMessage?.senderName || "Unknown User";
        const messagePreview = latestMessage?.text || "No messages yet...";

        return (
          <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
            <a href="#">
              <div className="d-flex bd-highlight">
                <div className="user_info">
                  {/* Display sender's name */}
                  <span>{senderName}</span>
                  {/* Display last message text */}
                  <p>{messagePreview}</p>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
