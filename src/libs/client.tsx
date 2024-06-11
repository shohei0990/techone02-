// Notion APIの初期設定
import { Client as NotionClient } from "@notionhq/client";
import { isFullPage } from "@notionhq/client";

// Notion APIクライアントの初期化
const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN, // 環境変数からNotionの認証トークンを取得
});

// Notionメンバー情報の型定義
export type NotionMember = {
    id: string;
    name:string;
    jobtitle: string;
    selfintro: string;
    member_photo: string;
    job_career: string;
};

// Notionメンバー情報の型定義
export type NotionMember_00 = {
    id: string;
    member: {
        id: string;
    }[];
    name : string;
};

// Notion portfolio取得情報の型定義
export type NotionPost = {
    id: string;
    title: string;
    intro: string;
    tag1: string[];
    tag2: string[];
    member_name:string[];
    top_image: string;
    movie: string;
    text00: string;
    image01: string;
    image02: string;
    image03: string;
    image04: string;
    text01: string;
    text02: string;
    text03: string;
    text04: string;
};

// Notionのデータベースから全ての投稿を取得する関数
export async function getAllPosts(): Promise<NotionPost[]> {
    if (!process.env.DATABASE_ID) {
        throw new Error("DATABASE_ID is required"); // DATABASE_IDが設定されていない場合はエラーを投げる
    }

    try {
        const response = await notion.databases.query({
            database_id: process.env.DATABASE_ID, // 環境変数からデータベースIDを取得
            sorts: [
                {
                    property: 'id',
                    direction: 'descending', // IDに基づいて降順でソート
                },
            ]
        });

        // 取得したデータをNotionPost型に変換
        const posts = await Promise.all(response.results.map(async (post: any) => {
            const id = post.id;
            const title = post.properties.title.title[0]?.plain_text ?? "No Title";
            const intro = post.properties.intro.rich_text[0]?.plain_text ?? "";
            const tag1 = post.properties.tag1?.multi_select?.map((item: any) => item.name) ?? [];
            const tag2 = post.properties.tag2?.multi_select?.map((item: any) => item.name) ?? [];
            const member_name = post.properties.member_name?.multi_select?.map((item: any) => item.name) ?? [];
            const top_image = post.properties.top_image.files[0]?.file?.url ?? "";
            const movie = post.properties.movie.files[0]?.file?.url ?? "";
            const text00 = post.properties.text00.rich_text[0]?.plain_text ?? "";
            const image01 = post.properties.image01.files[0]?.file?.url ?? "";
            const image02 = post.properties.image02.files[0]?.file?.url ?? "";
            const image03 = post.properties.image03.files[0]?.file?.url ?? "";
            const image04 = post.properties.image04.files[0]?.file?.url ?? "";
            const text01 = post.properties.text01.rich_text[0]?.plain_text ?? "";
            const text02 = post.properties.text02.rich_text[0]?.plain_text ?? "";
            const text03 = post.properties.text03.rich_text[0]?.plain_text ?? "";
            const text04 = post.properties.text04.rich_text[0]?.plain_text ?? "";


            return {
                id,
                title,
                intro,
                tag1,
                tag2,
                member_name,
                top_image,
                movie,
                text00,
                image01,
                image02,
                image03,
                image04,
                text01,
                text02,
                text03,
                text04
            };
        }));

        return posts; // 変換した投稿データを返す
    } catch (error) {
        console.error("投稿の取得中にエラーが発生しました:", error); // エラーが発生した場合はコンソールに出力
        throw error;
    }
}

// Notionのデータベースから全てのメンバー情報を取得する関数
export async function getAllMembers(): Promise<NotionMember[]> {
    if (!process.env.MEMBER_DATABASE_ID) {
        throw new Error("MEMBER_DATABASE_ID is required"); // MEMBER_DATABASE_IDが設定されていない場合はエラーを投げる
    }

    try {
        const response = await notion.databases.query({
            database_id: process.env.MEMBER_DATABASE_ID, // 環境変数からメンバーデータベースIDを取得
            sorts: [
                {
                    property: 'id',
                    direction: 'ascending', // IDに基づいて昇順でソート
                },
            ]
        });

        // 取得したデータをNotionMember型に変換
        const members = await Promise.all(response.results.map(async (member: any) => {
            const id = member.id;
            const name = member.properties.name?.rich_text?.[0]?.plain_text ?? "";
            const jobtitle = member.properties.jobtitle?.rich_text?.[0]?.plain_text ?? ""; // jobtitleを取得
            const selfintro = member.properties.selfintro?.rich_text?.[0]?.plain_text ?? "";
            const member_photo = member.properties.member_photo?.files?.[0]?.file?.url ?? "";
            const job_career = member.properties.job_career?.files?.[0]?.file?.url ?? "";

            console.error("メンバーid", id); // エラーが発生した場合はコンソールに出力

            return {
                id,
                name,
                jobtitle,
                selfintro,
                member_photo, // ここにmember_photoを追加
                job_career
            };
        }));

        return members; // 変換したメンバーデータを返す
    } catch (error) {
                console.error("メンバー情報の取得中にエラーが発生しました:", error); // エラーが発生した場合はコンソールに出力
                throw error;
    }
}


// Notionのデータベースから全てのメンバー情報を取得する関数
export async function getAllMembers_00(): Promise<NotionMember_00[]> {
    if (!process.env.MEMBER_DATABASE_ID00) {
        throw new Error("MEMBER_DATABASE_ID00 is required"); // MEMBER_DATABASE_ID00が設定されていない場合はエラーを投げる
    }

    try {
        const response = await notion.databases.query({
            database_id: process.env.MEMBER_DATABASE_ID00, // 環境変数からメンバーデータベースIDを取得
            sorts: [
                {
                    property: 'id',
                    direction: 'ascending', // IDに基づいて昇順でソート
                },
            ]
        });

        // 取得したデータをNotionMember_00型に変換
        const members = await Promise.all(response.results.map(async (member: any) => {
            const id = member.id;
            const memberIds = member.properties.member?.people?.map((person: any) => person.id) ?? [];
            const name = member.properties.name?.rich_text?.[0]?.plain_text ?? ""; // 名前を取得

            return {
                id,
                member: memberIds.map((id: string) => ({ id })), // メンバーIDのみを取得
                name // 名前を追加
            };
        }));
        return members; // 変換したメンバーデータを返す

    } catch (error) {
        console.error("メンバー情報の取得中にエラーが発生しました:", error); // エラーが発生した場合はコンソールに出力
        throw error;
    }
}

// Notionのデータベースから全てのメンバー情報を取得し、結果をコンソールに出力する関数
export async function printAllMembers(): Promise<void> {
    try {
        const members = await getAllMembers(); // 全てのメンバー情報を取得
    } catch (error) {
        console.error("メンバー情報の取得中にエラーが発生しました:", error); // エラーが発生した場合はコンソールに出力
    }
}