const CopyrightFooter = () => {
  return (
    <div className="copyright-text">
      <p>
        © {new Date().getFullYear()}{" "}
        <a href="/" target="_blank" rel="noopener noreferrer">
          Founders’ Clinic
        </a>
        . All Right Reserved.
      </p>
    </div>
  );
};

export default CopyrightFooter;
