function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/blog/").then(res => setPosts(res.data));
    }, []);

    return (
        <div className="container">
            <h2>Blog</h2>
            {posts.map(p => (
                <div className="glass mb-3">
                    <h4>{p.title}</h4>
                    <p>{p.content}</p>
                </div>
            ))}
        </div>
    );
}
export default Blog