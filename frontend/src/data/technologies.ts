// ASK: where to save such data?

export type Technologie = {
    name: string,
    value: string
}

export const technologiesValues = [
    {
        name: "React",
        value: "react",
    },
    {
        name: "Vue",
        value: "vue",
    },
    {
        name: "PHP",
        value: "php",
    },
    {
        name: "Node.js",
        value: "node-js",
    },
    {
        name: "MongoDB",
        value: "mongodb",
    },
    {
        name: "SQL",
        value: "sql",
    },
];


export const formatTechnologies = (unformattedTechnologies: string[]) => {
    const tech: Technologie[] = [];

    unformattedTechnologies.forEach((techno: string) => {
        technologiesValues.find((el) => {
            if (el.value === techno) {
                tech.push(el);
            }
        });
    })
    return tech
}