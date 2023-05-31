export default function MakePost() {
  return (
    <section>
      <form>
        <label htmlFor="user">Enter your username: </label>
        <input type="text" id="user" placeholder="EagleTheEgirl" />
        <label htmlFor="desc">Write a description: </label>
        <textarea id="desc" placeholder="Kiwi perching on egg" />
        <label htmlFor="picture"> Share your bird spotting picture</label>
        <input type="file" name="picture" id="picture" />
      </form>
    </section>
  )
}
