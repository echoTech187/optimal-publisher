"use server";
import { fetchBookTitle, fetchBookTopic } from "../data/program";

export async function changeBookTitle(props:{e: any, setBookTitle: any}) {
    const {e} = props;
    const data = await fetchBookTitle({ selectedMajor: e.target.value });
    props.setBookTitle(data);
}

export async function changeBookTopic(props:{e: any, setBookTopic: any}) {
    const {e} = props;
    const data = await fetchBookTopic({ selectedBookTitle: e.target.value });
    props.setBookTopic(data);
}