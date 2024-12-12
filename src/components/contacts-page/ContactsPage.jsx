const ContactPage = ({closeContact}) => {

    return (
        <div
            className="fixed inset-0 bg-white  flex-col bg-opacity-100 flex items-center justify-center z-50"
        >
            <div className="text-neutral-800 font-alte-haas  block text-lg">
                <p className="underline pb-4">Contact</p>
                <p className="mt-4">Studio</p>
                <p>New York, USA</p>
                <p className="mt-4">e: ediexxu@gmail.com </p>
                <p className="mt-4">Ins: e__xu </p>
            </div>
            <button
                onClick={closeContact}
                className="mt-1 px-1 py-2 text-3xl  rounded"
            >
                x
            </button>
        </div>

    )
}

export default ContactPage;