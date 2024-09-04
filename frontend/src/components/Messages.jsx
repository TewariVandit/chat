const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);
    return (
        <div className='px-4 flex-1 overflow-y-auto bgi h-[calc(100vh-100px)]'>
            {
                messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }
        </div>
    )
}
