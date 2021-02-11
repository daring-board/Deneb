<template>
	<div id="speech2text">
		<b-container>
			<b-row>
				<b-button pill variant="primary" @click="start">録音開始</b-button>
			</b-row>
			<b-row>
				<b-col>
					<b-form-textarea
						v-model="text"
						placeholder="ここにテキストが表示されます。"
						rows="30"
						no-resize
						disabled
					></b-form-textarea>
				</b-col>
				<b-col>
					<b-form-textarea
						v-model="token_text"
						placeholder="ここに形態素解析の結果が表示されます。"
						rows="30"
						no-resize
						disabled
					></b-form-textarea>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import kuromoji from "kuromoji";

export default {
	name: "Speech2Text",
	data() {
		return {
			speech: null,
			text: "",
			token_text: "",
			tokenizer: null,
		};
	},
	mounted: function () {
		/* eslint-disable */
		this.speech = new webkitSpeechRecognition();
		this.speech.lang = "ja-JP";
		kuromoji.builder({ dicPath: "dict" }).build((err, tokenizer) => {
			if (err) {
				console.log(err);
			} else {
				this.tokenizer = tokenizer;
			}
		});
		this.speech.onresult = (e) => {
			this.speech.stop();
			const linedelimiter = "\n";
			if (e.results[0].isFinal) {
				var autotext = e.results[0][0].transcript;
				this.text += autotext + linedelimiter;
				const tokens = this.tokenizer.tokenize(autotext);
				tokens.forEach((token) => {
					this.token_text += `${token.surface_form}：分類: ${token.pos}, 基本形: ${token.basic_form}\n`;
				});
			}
			this.speech.onend = () => {
				this.speech.start();
			};
		};
	},
	methods: {
		start() {
			this.speech.start();
		},
	},
};
</script>