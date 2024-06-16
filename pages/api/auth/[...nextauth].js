/** Auth.js를 사용한 소셜 로그인
 * 
 */

import NextAuth from 'next-auth';
import GithubProivder from 'next-auth/providers/github'

export const authOptions = {
    providers: [
        GithubProivder({
            clientId: 'Ov23li1MHhIQgPSKFP60',
            clientSecret: 'e01a381036791c8e1dec30fc2302e6706efd93b3',
        }),
    ],
    secret : 'c21wZW9wbGU='
};
export default NextAuth(authOptions)