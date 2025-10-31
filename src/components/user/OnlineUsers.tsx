'use client';

const OnlineUsers = () => {
    // A simple static online users component for demonstration
    const users = [
        { name: 'Maren Maureen', id: '1094882001' },
        { name: 'Jenniffer Jane', id: '1094672000' },
        { name: 'Ryan Herwinds', id: '1094342003' },
        { name: 'Kierra Culhane', id: '1094662002' },
    ]
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Online Users</h3>
                <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400">See all</a>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 mr-3"></div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-gray-100">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.id}</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OnlineUsers;
