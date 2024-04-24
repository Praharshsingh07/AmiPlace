const CommunityFooter = () => {
  return (
    <div class="Community-footer sticky top-[500px] bg-[#f6f6f6] opacity-70 rounded-xl w-[300px] h-[200px] py-5 px-3 ml-6 border-[0.1px]">
      <div class="footer-links flex flex-col text-gray-600 text-base">
        <a href="#" class="footer-link hover:underline">
          Help / Contact Us.
        </a>
        <a href="#" class="footer-link hover:underline">
          Terms of use.
        </a>
        <a href="#" class="footer-link hover:underline">
          Cookie Consent Tool.
        </a>
      </div>
      <p class="mt-3 text-base text-gray-600">
        Copyright &copy; 2024, Amiplace{" "}
      </p>
    </div>
  );
};
export default CommunityFooter;
