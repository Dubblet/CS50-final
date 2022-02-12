export function parseName(name: string): string {
   return name.replace(/[:. ]+/, "-")
        .replace(/[.'’]/g, "")
        .toLowerCase();
}