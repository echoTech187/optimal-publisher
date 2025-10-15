'use client';

const Calendar = () => {
    // A simple static calendar component for demonstration
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">November 2025</h3>
                <div>
                    <button className="mr-2">&lt;</button>
                    <button>&gt;</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <div key={day} className="font-bold">{day}</div>)}
                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => <div key={day} className={`p-2 rounded-full ${[9, 10, 11, 12, 13].includes(day) ? 'bg-indigo-600 text-white' : ''}`}>{day}</div>)}
            </div>
        </div>
    )
}

export default Calendar;
