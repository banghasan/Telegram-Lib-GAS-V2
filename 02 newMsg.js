/**
* Kelas untuk kompatibilitas dan melengkapi generator method
* @type {Class} class tambahan
* @extends Telegram
*/
class msgTelegram extends Telegram {

  version() {
    return '2.20';
  }

  versi() {
    return this.version();
  }

  // kirimPesan adalah alias sendMessage, beda sedikit disable_notification dihilangkan
  kirimPesan(chat_id, text, parse_mode, disable_web_page_preview, reply_to_message_id, reply_markup) {
    return this.sendMessage(chat_id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  // kirimPesan adalah alias sendMessage, beda sedikit disable_notification dihilangkan
  copyMessage(chat_id, from_chat_id, message_id, caption, parse_mode, caption_entities, disable_notification, reply_to_message_id, allow_sending_without_reply, reply_markup) {
    return this.request('copyMessage', this.buildQuery({
      'chat_id': chat_id,
      'from_chat_id': from_chat_id,
      'message_id': message_id,
      'caption': caption,
      'parse_mode': parse_mode,
      'caption_entities': caption_entities,
      'disable_notification': disable_notification,
      'reply_to_message_id': reply_to_message_id,
      'allow_sending_without_reply': allow_sending_without_reply,
      'reply_markup': reply_markup
    }));
  }

  // compablity mode di versi sebelumnya	

  requestForm(method, data) {
    return this.request(method, data, true);
  }

  requestBlob(method, data) {
    return this.request(method, data, false, true);
  }

  // BUKAN ALIAS, msg artinya msg array. bukan chat id!
  // untuk mempersingkat proses, di build di lib

  sendMsg(msg, text, parse_mode, disable_web_page_preview, reply_to_message_id, reply_markup) {
    return this.sendMessage(msg.chat.id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  // kirim Keyboard Sederhana
  // parse mode HTML
  sendMessageKeyboard(chat_id, text, keyboard, parse_mode, disable_web_page_preview, reply_to_message_id) {
    parse_mode = parse_mode || 'HTML';
    var reply_markup = {
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: keyboard
    }
    return this.sendMessage(chat_id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  sendMsgKeyboard(msg, text, keyboard, parse_mode, disable_web_page_preview, reply_to_message_id) {
    parse_mode = parse_mode || 'HTML';
    var reply_markup = {
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: keyboard
    }
    return this.sendMessage(msg.chat.id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  // kirim Remove Keyboard 
  sendMessageRemoveKeyboard(chat_id, text, parse_mode, disable_web_page_preview, reply_to_message_id) {
    parse_mode = parse_mode || 'HTML';
    var reply_markup = {
      ReplyKeyboardRemove: true
    }
    return this.sendMessage(chat_id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  sendMsgRemoveKeyboard(msg, text, parse_mode, disable_web_page_preview, reply_to_message_id) {
    parse_mode = parse_mode || 'HTML';
    var reply_markup = {
      ReplyKeyboardRemove: true
    }
    return this.sendMessage(msg.chat.id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  sendMessageKeyboardInline(chat_id, text, keyboard, parse_mode, disable_web_page_preview, reply_to_message_id) {
    parse_mode = parse_mode || 'HTML';
    var reply_markup = {
      inline_keyboard: keyboard
    }
    return this.sendMessage(chat_id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  sendMsgKeyboardInline(msg, text, keyboard, parse_mode, disable_web_page_preview, reply_to_message_id) {
    parse_mode = parse_mode || 'HTML';
    var reply_markup = {
      inline_keyboard: keyboard
    }
    return this.sendMessage(msg.chat.id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  // kirim Force Reply
  sendMessageForceReply(chat_id, text, parse_mode, disable_web_page_preview, reply_to_message_id) {
    parse_mode = parse_mode || 'HTML';
    var reply_markup = {
      force_reply: true,

    }
    return this.sendMessage(chat_id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  sendMsgForceReply(msg, text, parse_mode, disable_web_page_preview, reply_to_message_id) {
    parse_mode = parse_mode || 'HTML';
    var reply_markup = {
      force_reply: true,

    }
    return this.sendMessage(msg.chat.id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
  }

  forwardMsg(msg, from_chat_id, message_id) {
    return this.forwardMessage(msg.chat.id, from_chat_id, false, message_id);
  }

  sendMsgPhoto(msg, photo, caption, parse_mode, reply_to_message_id, reply_markup) {
    return this.sendPhoto(msg.chat.id, photo, caption, parse_mode, false, reply_to_message_id, reply_markup);
  }

  sendMsgAudio(msg, audio, caption, parse_mode, duration, performer, title, thumb, reply_to_message_id, reply_markup) {
    return this.sendAudio(msg.chat.id, audio, caption, parse_mode, duration, performer, title, thumb, false, reply_to_message_id, reply_markup)
  }

  sendMsgDocument(msg, document, thumb, caption, parse_mode, reply_to_message_id, reply_markup) {
    return this.sendDocument(msg.chat.id, document, thumb, caption, parse_mode, false, reply_to_message_id, reply_markup);
  }

  getFileLink(file_id) {
     let content = this.getFile(file_id)
     if (content.result.file_path)
     return this.urlapi + this.token + '/' + content.result.file_path
     return false
  }

  // tambahan method yang belum ada di generator
  getUpdates(offset, limit, timeout, allowed_updates) {
    return this.request('getUpdates', this.buildQuery({
      'offset': offset,
      'limit': limit,
      'timeout': timeout,
      'allowed_updates': allowed_updates
    }));
  }

  setWebhook(url, max_connections) {
    return this.request('setWebhook', this.buildQuery({
      'url': url,
      'max_connections': max_connections
    }));
  }

  deleteWebhook() {
    return this.request('deleteWebhook');
  }

  getWebhookInfo() {
    return this.request('getWebhookInfo');
  }


  /**
* Edit text and game messages sent by the bot or via the bot (for inline bots).
* On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
* @param chat_id Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
* @param message_id Required if inlineMessageId is not specified. Identifier of the sent message
* @param inline_message_id Required if chatId and messageId are not specified. Identifier of the inline message
* @param text New text of the message
*/

  editMessageText(chat_id, message_id, inline_message_id, text, parse_mode, disable_web_page_preview, reply_markup) {
    return this.request('editMessageText', this.buildQuery({
      'chat_id': chat_id,
      'message_id': message_id,
      'inline_message_id': inline_message_id,
      'text': text,
      'parse_mode': parse_mode,
      'disable_web_page_preview': disable_web_page_preview,
      'reply_markup': reply_markup
    }));
  }

  editMessageCaption(chat_id, message_id, inline_message_id, caption, parse_mode, reply_markup) {
    return this.request('editMessageCaption', this.buildQuery({
      'chat_id': chat_id,
      'message_id': message_id,
      'inline_message_id': inline_message_id,
      'caption': caption,
      'parse_mode': parse_mode,
      'reply_markup': reply_markup
    }));
  }

  editMessageMedia(chat_id, message_id, inline_message_id, media, reply_markup) {
    return this.request('editMessageMedia', this.buildQuery({
      'chat_id': chat_id,
      'message_id': message_id,
      'inline_message_id': inline_message_id,
      'media': media,
      'reply_markup': reply_markup
    }));
  }

  /**
  * Edit only the reply markup of messages sent by the bot or via the bot (for inline bots).
  * @param chat_id Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
  * @param message_id Required if inlineMessageId is not specified. Identifier of the sent message
  * @param inline_message_id Required if chatId and messageId are not specified. Identifier of the inline message
  * @param reply_markup A JSON-serialized object for an inline keyboard.
  * @returns If edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
  */

  editMessageReplyMarkup(chat_id, message_id, inline_message_id, reply_markup) {
    return this.request('editMessageReplyMarkup', this.buildQuery({
      'chat_id': chat_id,
      'message_id': message_id,
      'inline_message_id': inline_message_id,
      'reply_markup': reply_markup
    }));
  }

  stopPoll(chat_id, message_id, reply_markup) {
    return this.request('stopPoll', this.buildQuery({
      'chat_id': chat_id,
      'message_id': message_id,
      'reply_markup': reply_markup
    }));
  }

  /**
  * Delete a message, including service messages, with the following limitations:
  * - A message can only be deleted if it was sent less than 48 hours ago.
  * - Bots can delete outgoing messages in groups and supergroups.
  * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
  * - If the bot is an administrator of a group, it can delete any message there.
  * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
  * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
  */

  deleteMessage(chat_id, message_id) {
    return this.request('deleteMessage', this.buildQuery({
      'chat_id': chat_id,
      'message_id': message_id
    }));
  }

  sendSticker(chat_id, sticker, disable_notification, reply_to_message_id, reply_markup) {
    return this.request('sendSticker', this.buildQuery({
      'chat_id': chat_id,
      'sticker': sticker,
      'disable_notification': disable_notification,
      'reply_to_message_id': reply_to_message_id,
      'reply_markup': reply_markup
    }));
  }

  createChatInviteLink(chat_id, expire_date, member_limit) {
    return this.request('createChatInviteLink', this.buildQuery({
      'chat_id': chat_id,
      'expire_date': expire_date,
      'member_limit': member_limit
    }));
  }

  editChatInviteLink(chat_id, invite_link, expire_date, member_limit) {
    return this.request('editChatInviteLink', this.buildQuery({
      'chat_id': chat_id,
      'invite_link': invite_link,
      'expire_date': expire_date,
      'member_limit': member_limit
    }));
  }

  revokeChatInviteLink(chat_id, invite_link) {
    return this.request('revokeChatInviteLink', this.buildQuery({
      'chat_id': chat_id,
      'invite_link': invite_link
    }));
  }

}