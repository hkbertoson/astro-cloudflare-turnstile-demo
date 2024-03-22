import {type FormEvent, useRef} from 'react';
import Turnstile, {useTurnstile} from 'react-turnstile';

export const prerender = false;

export default function ContactForm() {
	const turnstile = useTurnstile();
	const formRef = useRef<HTMLFormElement>(null);

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const token = new FormData(formRef.current!).get('cf-turnstile-response');
		console.log(typeof token);

		const res = await fetch('/api/verify', {
			method: 'POST',
			body: JSON.stringify({token}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await res.json();

		if (data.success) {
			alert('Form submitted');
		} else {
			alert('Please verify you are not a robot');
		}
	};

	/*
	 * See https://developers.cloudflare.com/turnstile/reference/testing/
	 * for different sitekeys to use.
	 *
	 *
	 * https://docs.page/marsidev/react-turnstile/props
	 * for more props you can pass to the Turnstile component.
	 */
	return (
		<form ref={formRef} onSubmit={submit}>
			<label>Name: </label>
			<input type="text" name="name" required />
			<Turnstile sitekey="1x00000000000000000000AA" size="invisible" />
			<button type="submit">Submit</button>
		</form>
	);
}
