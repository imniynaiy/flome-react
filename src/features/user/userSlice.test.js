import { validateUser } from "./userSlice";

it('validate users', () => {
    expect(validateUser("1", 1718000000, "2")).toEqual(false);
    expect(validateUser("", 1800000000, "2")).toEqual(false);
    expect(validateUser("1", 1800000000, "")).toEqual(false);
    expect(validateUser("", 1800000000, "")).toEqual(false);
    expect(validateUser("1", 1800000000, "2")).toEqual(true);
});