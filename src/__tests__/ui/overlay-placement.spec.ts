import { initialize, beforeEachTest } from "../../test-utils";
import { calculate } from "../../ui/overlay-placement";

const ctx = initialize();

describe("overlay-placement", () => {
    beforeEach(() => beforeEachTest(ctx));

    describe("calculation", () => {
        it("should place dropdown below", () => {
            const rect = calculate(
                {
                    top: 765,
                    height: 20,
                    left: 10,
                    width: 100,
                },
                1000,
                200,
                0
            );

            expect(rect).toEqual({ top: 785, height: 200, left: 10, width: 100 });
        });

        it("should place dropdown above", () => {
            const rect = calculate(
                {
                    top: 795,
                    height: 20,
                    left: 10,
                    width: 100,
                },
                1000,
                200,
                0
            );

            expect(rect).toEqual({ top: 595, height: 200, left: 10, width: 100 });
        });

        it("should scaling down dropdown", () => {
            const rect = calculate(
                {
                    top: 40,
                    height: 20,
                    left: 10,
                    width: 100,
                },
                250,
                300,
                0,
                200
            );

            expect(rect).toEqual({ top: 60, height: 180, left: 10, width: 100 });
        });
    });
});
