import { escape, escapeRegex } from "../ui/utils";

describe("simpleTree", () => {
    describe("utils", () => {
        it("escape - should preserve original value", () => {
            const s = "This is my test string.";
            const escaped = escape(s);
            expect(escaped).toEqual(s);
        });

        it("escape - should escape html", () => {
            const s = "This is my <strong>test</strong> string.";
            const expected = "This is my &lt;strong&gt;test&lt;/strong&gt; string.";
            const escaped = escape(s);
            expect(escaped).toEqual(expected);
        });

        it("escape - should return an empty string", () => {
            const s = "";
            const escaped = escape(s);
            expect(escaped).toEqual(s);
        });

        it("escapeRegex - should preserve original value", () => {
            const s = "Thisismyteststring";
            const escaped = escapeRegex(s);
            expect(escaped).toEqual(s);
        });

        it("escapeRegex - should escape html", () => {
            const s = "This is my [test].* string";
            const expected = "This\\ is\\ my\\ \\[test\\]\\.\\*\\ string";
            const escaped = escapeRegex(s);
            expect(escaped).toEqual(expected);
        });

        it("escapeRegex - should return an empty string", () => {
            const s = "";
            const escaped = escapeRegex(s);
            expect(escaped).toEqual(s);
        });
    });
});
