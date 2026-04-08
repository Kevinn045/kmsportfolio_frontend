function Header() {
    return (
        <div className="bg-light text-center p-5">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1>Hi, I'm Elite Dev</h1>
            </motion.div>

        </div>
    );
}
export default Header