package com.bae.EvaLibrary.data;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity

public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String title;
	private String author;
	private String publisher;

	public Book(int id, String title, String author, String publisher) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.publisher = publisher;
	}

	public Book(String title, String author, String publisher) {
		super();
		this.title = title;
		this.author = author;
		this.publisher = publisher;
	}

	public Book() {

	}

	@Override
	public int hashCode() {
		return Objects.hash(author, id, publisher, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		return Objects.equals(author, other.author) && id == other.id && Objects.equals(publisher, other.publisher)
				&& Objects.equals(title, other.title);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	@Override
	public String toString() {
		return "Books [title=" + title + ", author=" + author + ", publisher=" + publisher + "]";
	}

}
