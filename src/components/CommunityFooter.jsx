const CommunityFooter = () => {
  return (
    <div className="Community-footer hidden md:block sticky top-[500px] bg-[#f6f6f6] opacity-70 rounded-xl w-[300px] h-[200px] py-5 px-3 ml-6 border-[0.1px]">
      <div className="footer-links flex flex-col text-gray-600 text-base">
        <a href="#" className="footer-link hover:underline">
          Help / Contact Us.
        </a>
        <a href="#" className="footer-link hover:underline">
          Terms of use.
        </a>
        <a href="#" className="footer-link hover:underline">
          Cookie Consent Tool.
        </a>
      </div>
      <p className="mt-3 text-base text-gray-600">
        Copyright &copy; 2024, Amiplace{" "}
      </p>
    </div>
  );
};
export default CommunityFooter;
