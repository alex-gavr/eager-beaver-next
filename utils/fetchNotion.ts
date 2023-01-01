export const fetchNotion = async (dbKey: any) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_KEY}`,
        },
        body: JSON.stringify({
            filter: {
                property: 'key',
                rich_text: {
                    is_not_empty: true,
                },
            },
            sorts: [
                {
                    property: 'key',
                    direction: 'ascending',
                },
            ],
        }),
    };
    const data = await fetch(`https://api.notion.com/v1/databases/${dbKey}/query`, options);
    if (dbKey === process.env.NEXT_PUBLIC_NOTION_FUTURE_EVENTS_DB) {
        const result = await data.json().then((data) =>
            data.results.map((data: any) => {
                return {
                    page_id: data.id,
                    properties: data.properties,
                };
            })
        );
        return result;
    } else {
        const result = await data.json().then((data) => data.results.map((data: any) => data.properties));
        return result;
    }
};
