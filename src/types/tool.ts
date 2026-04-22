import { tools } from "@/lib/constants";

export type Tool = {
    id: string;
    imageUrl: string;
    name: keyof typeof tools;
}