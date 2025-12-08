export function RightSidebar() {
    return (
        <div className="hidden lg:flex flex-col w-[350px] sticky top-0 h-screen p-4 pl-8 border-l border-gray-100 gap-6">
            <div className="px-4 text-xs text-gray-500 flex flex-wrap gap-2 mt-4">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
                <span>Cookie Policy</span>
                <span>© 2025 X-Clone</span>
            </div>
        </div>
    );
}
