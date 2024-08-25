import GetUser from "./getUser";

interface ModalParameters {
    isHidden: boolean;
}

export default function Modal({ isHidden }: ModalParameters) {
    if (!isHidden) {
        return (
            <section>
                <GetUser/>
            </section>
        );
    }  
}