/**
 * sendEmailToVerifyClient @@@
 */
export function sendEmailToVerifyClient(value: string): boolean {
    return value === 'Foo';
}

/**
 * TODO: !!! Implement
 * TODO: !!!last Annotate
 * TODO: !!! Create DB view for jirka to be DB costs, feedbac etc visible for him
 * TODO: !!! Referral system
 * TODO: [🧠] Some unification method how to attribute costs to unique people
 *       - franta.novak@gmail.com -> franta.novak@gmail.com
 *       - franta.novak+alias@gmail.com -> franta.novak@gmail.com
 *       - me@pavolhejny.com -> pavolhejny.com
 *       - pavol@pavolhejny.com -> pavolhejny.com
 *       - voxisik917@mcenb.com -> anonymous
 *       - !! [🍏] What about Apple anonymous emails?
 * TODO: [🧠] Some method to detect one-time emails and do not allow them OR strictly warn them
 *       - Like voxisik917@mcenb.com
 *       - !! [🍏] What about Apple anonymous emails?
 */
